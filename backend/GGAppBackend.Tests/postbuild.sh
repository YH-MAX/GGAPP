#!/bin/sh

# Copy and rename dependency file for the test harness

if [ -e bin/Debug/net8.0/testhost.deps.json ]
then
	rm bin/Debug/net8.0/testhost.deps.json
fi

cp bin/Debug/net8.0/QPAppBackend.Tests.deps.json bin/Debug/net8.0/testhost.deps.json