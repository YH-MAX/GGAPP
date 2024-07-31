@ECHO OFF
SET "trailslash=%JAVA_HOME:~-2,1%"
IF %trailslash% == \ (
	SET "javadir=%JAVA_HOME%"
	)
IF NOT %trailslash% == \ (
	SET "javadir=%JAVA_HOME%\"
	)

"%javadir%bin\java" -jar karate.jar src