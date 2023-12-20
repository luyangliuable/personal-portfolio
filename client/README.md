# Client

### Deployment

```sh
cd ./build 
npm run build
scp -r * root@170.64.250.107:/var/www/llcode.tech/html/
ssh root@170.64.250.107 'nginx -s reload'
```
