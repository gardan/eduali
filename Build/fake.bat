@echo off
cls
REM "tools\nuget\nuget.exe" "install" "FAKE" "-OutputDirectory" "tools" "-ExcludeVersion"
"tools\FAKE\tools\Fake.exe" build\build.fsx
pause