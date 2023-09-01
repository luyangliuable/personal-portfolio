# How to Post?

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [How to Post?](#how-to-post)

<!-- markdown-toc end -->



1. Created a markdown file locally
2. Go into sftp

```sh
sftp root@170.64.250.107 
```

2. Put file in

```sh
cd /mnt/*/*/2023/8/
put -r ~/Markdown/2023/8/ .
```
