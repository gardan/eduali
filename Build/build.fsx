// include Fake lib
#r @"..\tools\FAKE\tools\FakeLib.dll"
open Fake

// properties
let root = "./"
let buildArtefacts = "./buildartefacts"

Target "Clean" (fun _ -> 
    CleanDir buildArtefacts
)

Target "Build" (fun _ -> 
    CleanDir buildArtefacts
)

// start build
RunTargetOrDefault "Clean"
