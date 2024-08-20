#!/bin/bash

# Copy and rename dependency file for the test harness

WORK_PATH=$(pwd)
IFS='/' read -ra DIR_SPLIT <<< "$WORK_PATH"
DIR=""

for i in "${DIR_SPLIT[@]}"; do
	DIR="$i"
done

PATH_PREFIX=""
if [[ "$DIR" == "backend" ]]; then
	PATH_PREFIX="GGAppBackend.Tests/"
fi

pwd
echo "Path Prefix: ${PATH_PREFIX}"
echo "DIR: ${DIR}"

if [ -e "${PATH_PREFIX}bin/Debug"]; then
	if [ -e "${PATH_PREFIX}bin/Debug/net8.0/testhost.deps.json" ]; then
		rm "${PATH_PREFIX}bin/Debug/net8.0/testhost.deps.json"
	fi

	cp "${PATH_PREFIX}bin/Debug/net8.0/QPAppBackend.Tests.deps.json" "${PATH_PREFIX}bin/Debug/net8.0/testhost.deps.json"
fi

if [ -e "${PATH_PREFIX}bin/Release"]; then
	if [ -e "${PATH_PREFIX}bin/Release/net8.0/testhost.deps.json" ]; then
		rm "${PATH_PREFIX}bin/Release/net8.0/testhost.deps.json"
	fi

	cp "${PATH_PREFIX}bin/Release/net8.0/QPAppBackend.Tests.deps.json" "${PATH_PREFIX}bin/Release/net8.0/testhost.deps.json"
fi