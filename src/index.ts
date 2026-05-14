interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * INSPIRE-HEP MCP — high-energy physics literature.
 *
 * Auth: none. Docs: https://github.com/inspirehep/rest-api-doc
 */


const BASE = 'https://inspirehep.net/api';
const UA = 'pipeworx-mcp-inspire-hep/1.0 (+https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  {
    name: 'search',
    description: 'Literature search.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Lucene/Solr query, e.g. "title higgs AND author maldacena".' },
        sort: { type: 'string', description: 'mostrecent | mostcited (default mostrecent)' },
        size: { type: 'number', description: '1-250 (default 25)' },
        page: { type: 'number', description: '1-based (default 1)' },
        fields: { type: 'string', description: 'Comma-sep list of fields to return.' },
      },
      required: ['query'],
    },
  },
  {
    name: 'literature',
    description: 'Single literature record by INSPIRE record id.',
    inputSchema: {
      type: 'object',
      properties: { record_id: { type: 'number' } },
      required: ['record_id'],
    },
  },
  {
    name: 'authors_search',
    description: 'Search authors.',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string' }, size: { type: 'number' } },
      required: ['query'],
    },
  },
  {
    name: 'author',
    description: 'Author record by INSPIRE id.',
    inputSchema: {
      type: 'object',
      properties: { record_id: { type: 'number' } },
      required: ['record_id'],
    },
  },
  {
    name: 'institutions_search',
    description: 'Search institutions.',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string' }, size: { type: 'number' } },
      required: ['query'],
    },
  },
  {
    name: 'conferences_search',
    description: 'Search conferences.',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string' }, size: { type: 'number' } },
      required: ['query'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'search':
      return inspireGet(`/literature?${buildSearch(args, 'mostrecent')}`);
    case 'literature':
      return inspireGet(`/literature/${(args.record_id as number) | 0}`);
    case 'authors_search':
      return inspireGet(`/authors?${buildSearch(args, 'mostrecent')}`);
    case 'author':
      return inspireGet(`/authors/${(args.record_id as number) | 0}`);
    case 'institutions_search':
      return inspireGet(`/institutions?${buildSearch(args, 'mostrecent')}`);
    case 'conferences_search':
      return inspireGet(`/conferences?${buildSearch(args, 'mostrecent')}`);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function buildSearch(args: Record<string, unknown>, defaultSort: string): string {
  const params = new URLSearchParams({
    q: reqStr(args, 'query', '"higgs boson"'),
    sort: String(args.sort ?? defaultSort),
    size: String(Math.min(250, Math.max(1, (args.size as number) ?? 25))),
    page: String(Math.max(1, (args.page as number) ?? 1)),
  });
  if (args.fields) params.set('fields', String(args.fields));
  return params.toString();
}

async function inspireGet(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
  if (res.status === 404) throw new Error('INSPIRE-HEP: not found');
  if (!res.ok) throw new Error(`INSPIRE-HEP: ${res.status} ${await res.text().then((t) => t.slice(0, 200))}`);
  return res.json();
}

function reqStr(args: Record<string, unknown>, key: string, example: string): string {
  const v = args[key];
  if (typeof v !== 'string' || !v.trim()) {
    throw new Error(`Required argument "${key}" is missing. Pass a string like ${example}.`);
  }
  return v;
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
