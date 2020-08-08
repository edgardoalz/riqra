#!/bin/bash

DIR=$(dirname $0)
SYSTEMD_COLORS=1
SERVICE=envio-api.service
# Stop service
systemctl stop $SERVICE &&
# Replace binary
cp $DIR/main $DIR/old && cp $DIR/new $DIR/main &&
# Restart service
systemctl start $SERVICE &&
# Show status
systemctl status $SERVICE &&
# Show logs
sleep 5 && journalctl -n 10 -u $SERVICE