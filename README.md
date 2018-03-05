# Emscripten(emcc) service for WebAssembly Studio

This is emcc microservice for WebAssembly Studio.

## Running service

```
bash download.sh
node .
```
By default it will run on "0.0.0.0:8082" address. Use `PORT` environment variable to change it.

## Note
In case you have apt-get support instead of yum:
Replace these 4 lines in download.sh:
```
sudo yum groupinstall 'Development Tools'
sudo yum install cmake
sudo yum install python27
sudo yum install nodejs
```
With these:
```
sudo apt-get install build-essential
sudo apt-get install cmake
sudo apt-get install python2.7
sudo apt-get install nodejs
```
