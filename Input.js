
const modifier = (text) => {
  const regex = /\n? ?(?:> You |> You say "|)\/(\w+?)( [\w ]+)?[".]?\n?$/i
  const commandMatcher = text.match(regex)
  state.cyoaLine = "\n> Select the next story event by inputting \"/a\", \"/b\", \"/c\", or \"/d\""
  let command = null;
  let args = null;
  let newText = text;
  let stop = false;
  const modeMax = 2

  if(!state.cyoaMode){state.cyoaMode = 1}
  if (commandMatcher) {
    command = commandMatcher[1].toLowerCase()
    args = commandMatcher[2] ? commandMatcher[2].toLowerCase().trim().split(' ') : []
  }
  if(command === "cyoa" || command === "y"){
    state.cyoa = true;
    newText = state.cyoaLine
    if(args[0]==="mode"){
      state.cyoaMode += 1
      if(state.cyoaMode > modeMax) {state.cyoaMode = 1}
    }
  }
  if(command === "a" && state.latestCyoa){
    newText = "\n\n["+findLastLineStartingWith(state.latestCyoa, "A.").substring(3)+"]\n"
    state.cyoa = false;
  }
  if(command === "b" && state.latestCyoa){
    newText = "\n\n["+findLastLineStartingWith(state.latestCyoa, "B.").substring(3)+"]\n"
    state.cyoa = false;
  }
  if(command === "c" && state.latestCyoa){
    newText = "\n\n["+findLastLineStartingWith(state.latestCyoa, "C.").substring(3)+"]\n"
    state.cyoa = false;
  }
  if(command === "d" && state.latestCyoa){
    newText = "\n\n["+findLastLineStartingWith(state.latestCyoa, "D.").substring(3)+"]\n"
    state.cyoa = false;
  }
  return { text: newText, stop }
}

// Don't modify this part
modifier(text)
