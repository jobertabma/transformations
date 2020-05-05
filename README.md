# What is this?

This tool will help you understand how input is transformed on a system, which can help you craft better payloads.

![example 1](https://pbs.twimg.com/media/EXI1zgtU4AA-p5h?format=jpg&name=4096x4096)

Example: if you notice that a server responds with `c1aa46d751f1ffa58481418667134109ac5f573c` when you give in `test`, this tool will immediately tell you that it’s `stringReverse(sha1(md5(md5("test"))))`.

![example 2](https://pbs.twimg.com/media/EXI10SuVcAAwqOp?format=jpg&name=4096x4096)

# Online version

This tool can be used at https://transformations.jobertabma.nl/

# Docker version

You can also run this tool offline.

```
git clone https://github.com/jobertabma/transformations
cd transformations
docker build --tag transformations .
docker run -d -p 8080:80 transformations
```

You can then access the tool at http://localhost:8080/.
