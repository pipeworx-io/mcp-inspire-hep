# @pipeworx/inspire-hep

[INSPIRE-HEP](https://inspirehep.net) MCP — comprehensive high-energy physics literature database. Keyless.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `search(query, sort?, size?, page?, fields?)` — literature search (Solr-style)
- `literature(record_id)` — single paper by record id
- `authors_search(query, size?)` — author search
- `author(record_id)` — author record
- `institutions_search(query, size?)` — institution search
- `conferences_search(query, size?)` — conference search

## Data source

`https://inspirehep.net/api/`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "inspire-hep": {
      "url": "https://gateway.pipeworx.io/inspire-hep/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Inspire Hep data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
