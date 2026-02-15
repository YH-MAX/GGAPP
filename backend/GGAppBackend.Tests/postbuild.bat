REM
REM Copy and rename dependency file for the test harness
REM

if exist bin\debug\net8.0\testhost.deps.json (
	DEL bin\debug\net8.0\testhost.deps.json
)

COPY bin\debug\net8.0\GGAppBackend.Tests.deps.json bin\debug\net8.0\testhost.deps.json