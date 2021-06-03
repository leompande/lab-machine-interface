#!/bin/bash

npm run build && rm -rf ../../node/projects/lab-machine-intergration-module/interface/* && sudo cp -R dist/intergration-interface/* ../../../node/projects/lab-machine-intergration-module/interface
