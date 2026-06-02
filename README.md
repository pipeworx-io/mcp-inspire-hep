# mcp-inspire-hep

INSPIRE-HEP MCP — high-energy physics literature.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 673+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `search` | Literature search. |
| `literature` | Single literature record by INSPIRE record id. |
| `authors_search` | Search authors. |
| `author` | Author record by INSPIRE id. |
| `institutions_search` | Search institutions. |
| `conferences_search` | Search conferences. |

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

Or connect to the full Pipeworx gateway for access to all 673+ data sources:

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

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
