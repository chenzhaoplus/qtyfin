# page like this
***Stock Statistics***

![image](http://note.youdao.com/yws/public/resource/635a3b759d31135cbd682b30242bbf8b/xmlnote/AB1E7810B61141E2AC875CFB34079CDB/26947)


# boot in ide
```
yarn run dev
```

# package
```
yarn run build
```


# install nginx 
visit [How to install nginx](https://github.com/chenzhaoplus/linux-scripts/tree/master/nginx)


# publish your code in nginx
![image](http://note.youdao.com/yws/public/resource/635a3b759d31135cbd682b30242bbf8b/xmlnote/754A23C9D13F4361BFD576EE2CC09BD9/26945)


# add nginx server config
```
server {
    listen       8888;
    server_name  localhost;
    
    # front server proxy
    location / {
        try_files $uri  /index.html;
        root   /usr/local/nginx/front/qtyfin/dist;
        index index.html; 
    }
    # backend server proxy
    location ^~/backend {
        proxy_pass http://localhost:9999/;   # the last '/' is necessary
        proxy_redirect off;
        #proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;             
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;             
        proxy_set_header Host $http_host;         
        client_max_body_size 10m;
        proxy_connect_timeout 90;
        proxy_read_timeout 90;  
        proxy_set_header Cookie $http_cookie;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
    
    location ~ /.ht {
        deny  all;
    }
}
```

# backend
visit [https://github.com/chenzhaoplus/qty_fin](https://github.com/chenzhaoplus/qty_fin)