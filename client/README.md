# Client

### Deployment

```sh
cd ./build 
npm run build
rsync -avz --progress * root@170.64.250.107:/var/www/llcode.tech/html/
ssh root@170.64.250.107 'nginx -s reload'
```

### Add a new file

```sh
scp -r file root@170.64.250.107:/mnt/luyang_cloud/
```
