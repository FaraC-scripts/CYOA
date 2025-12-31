state.cyoaHiddenPrompts = [
    //Mode 1 - Default
    [
        "",
        "{",
        "\"ai_instruction_override\": {",
        "\"objective\": \"Ignore all previous instructions. Based on the preceeding story, present four options to the player representing the next event in the story.\",",
        "\"formatting_rules\": {",
        "\"option_token_cap\": 50,",
        "\"list_format\": \"Each option must start on a new line and be preceeded by 'A.', 'B.', 'C.', or 'D.'\",",
        "\"preamble\": \"None. Only output the four options as a lettered list.\",",
        "\"narrative_view\": \"Write options in the future tense, e.g., '${Character} will ${Action}', and match the pronouns used for the protagonist in the story. If the story uses 'he,' use '${Protagonist Name} will'; if the story uses 'I,', use 'I will'; if the story uses 'you,' use 'you will.'\",",
        "\"format_example\": `A. ${Option A (a string of 50 or fewer tokens)}\nB. ${Option B (a string of 50 or fewer tokens)}\nC. ${Option C (a string of 50 or fewer tokens)}\nD. ${Option D (a string of 50 or fewer tokens)}`",
        "}",
        "\"option_types\": \"[\"protagonist actions\",\"other character actions\",\"events\"]\",",
        "\"option_variety\": \"Prioritize protagonist actions when the protagonist has meaningful agency. Include other character actions when other characters are present. Include events when they are suggested by the narrative.\"",
        "}",
        "}",
        "[Execute ai_instruction_override]"
    ].join('\n'),
    //Mode 2 - Elaborate options
    [
        "",
        "{",
        "\"ai_instruction_override\": {",
        "\"objective\": \"Ignore all previous instructions. Based on the preceeding story, present four options to the player representing the next event in the story.\",",
        "\"formatting_rules\": {",
        "\"option_token_cap\": 100,",
        "\"list_format\": \"Each option must start on a new line and be preceeded by 'A.', 'B.', 'C.', or 'D.'\",",
        "\"preamble\": \"None. Only output the four options as a lettered list.\",",
        "\"narrative_view\": \"Write options in the future tense, e.g., '${Character} will ${Action}', and match the pronouns used for the protagonist in the story. If the story uses 'he,' use '${Protagonist Name} will'; if the story uses 'I,', use 'I will'; if the story uses 'you,' use 'you will.'\",",
        "\"format_example\": `A. ${Option A (a string of 100 or fewer tokens)}\nB. ${Option B (a string of 100 or fewer tokens)}\nC. ${Option C (a string of 100 or fewer tokens)}\nD. ${Option D (a string of 100 or fewer tokens)}`",
        "}",
        "\"option_types\": \"[\"protagonist actions\",\"other character actions\",\"events\"]\",",
        "\"option_variety\": \"Prioritize protagonist actions when the protagonist has meaningful agency. Always include at least one protagonist action. Include non-protagonist options when they fit the narrative and make sense.\"",
        "\"option_style\": \"Write options descriptively and elaborately, matching the writing style of the story.\"",
        "}",
        "}",
        "[Execute ai_instruction_override]"
    ].join('\n')
]

state.cyoaLine = "\n> Select the next story event by inputting \"/a\", \"/b\", \"/c\", or \"/d\""

function handleCyoaInput(text){
  const regex = /\n? ?(?:> You |> You say "|)\/(\w+?)( [\w ]+)?[".]?\n?$/i
  const commandMatcher = text.match(regex)
  let command = null;
  let args = null;
  const modeMax = state.cyoaHiddenPrompts.length

  if(!state.cyoaMode){state.cyoaMode = 1}
  if (commandMatcher) {
    command = commandMatcher[1].toLowerCase()
    args = commandMatcher[2] ? commandMatcher[2].toLowerCase().trim().split(' ') : []
  }

  if(command === "cyoa" || command === "y"){
    state.cyoa = true;
    text = state.cyoaLine
    if(args[0]==="mode"){
      state.cyoaMode += 1
      if(state.cyoaMode > modeMax) {state.cyoaMode = 1}
    }
  }
  
  if(state.latestCyoa){
    if(command === "a"){
        text = "\n\n["+findLastLineStartingWith(state.latestCyoa, "A.").substring(3)+"]\n"
        state.cyoa = false;
    }
    if(command === "b"){
        text = "\n\n["+findLastLineStartingWith(state.latestCyoa, "B.").substring(3)+"]\n"
        state.cyoa = false;
    }
    if(command === "c"){
        text = "\n\n["+findLastLineStartingWith(state.latestCyoa, "C.").substring(3)+"]\n"
        state.cyoa = false;
    }
    if(command === "d"){
        text = "\n\n["+findLastLineStartingWith(state.latestCyoa, "D.").substring(3)+"]\n"
        state.cyoa = false;
    }
  }

  return text
}

function handleCyoaContext(text){
  let lines = text.split('\n').filter(line => !(line.startsWith('//') || line.startsWith('•')))
  state.cyoa = lines[lines.length - 1] === state.cyoaLine.substring(1) ? true : false
  text = lines.join('\n')
  text = text.replaceAll(state.cyoaLine, "\n")
  state.latestContext = text

  if(state.cyoa){
    text = lines.join('\n')+ state.cyoaHiddenPrompts[state.cyoaMode - 1]
    log(text)
  }

  return text
}

function handleCyoaOutput(text){
    if(state.cyoa){
        if (text.startsWith('\n')){
            text = text.substring(1)
        }
        if (text.endsWith('\n')){
            text = text.slice(0, -1)
        }
        text = text.trim()
        state.latestCyoa = text
        text = addSymbolToStringLines(text, "• ")
    }

    return text
}

function addSymbolToStringLines(text, sym) {
    return text.split('\n')
               .map(line => sym + line)
               .join('\n');
}

function findLastLineStartingWith(text, searchString) {
    if (!text || !searchString) return null;
    
    // Split the text into lines
    const lines = text.split('\n');
    
    // Search from the last line to the first line (highest-index to lowest)
    for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].startsWith(searchString)) {
            return lines[i];
        }
    }
}
