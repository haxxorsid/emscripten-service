#!/usr/bin/env bash
sudo yum groupinstall 'Development Tools'
sudo yum install cmake
sudo yum install python27
sudo yum install nodejs
mkdir -p downloads
curl https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable.tar.gz -o downloads/emsdk-portable.tar.gz
mkdir -p emscripten
tar -C emscripten/ --strip-components=1 -xvf downloads/emsdk-portable.tar.gz
./emscripten/emsdk update
./emscripten/emsdk install latest
./emscripten/emsdk activate latest
rm -rf downloads
source ./emscripten/emsdk_env.sh
