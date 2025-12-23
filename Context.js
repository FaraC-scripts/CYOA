
const modifier = (text) => {
  if(state.cyoaLine){
    newText = newText.replaceAll(state.cyoaLine, "\n")
  }
  lines = newText.split('\n').filter(line => !(line.startsWith('//') || line.startsWith('•')))
  newText = lines.join('\n')
  state.latestContext = newText

  let splitContext = text.split('\n');
  state.cyoa = splitContext[splitContext.length - 1] === state.cyoaLine.substring(1) ? true : false 
  const cyoaHiddenPrompts = [
    "\n{\n\"ai_instruction_override\":{\n\"objective\": \"Ignore all previous instructions. Based on the preceeding story, present four options to the player representing the next event in the story.\",\n\"formatting_rules\": {\n\"option_token_cap\": 50,\n\"list_format\": \"Each option must start on a new line and be preceeded by 'A.', 'B.', 'C.', or 'D.'\",\n\"preamble\": \"None. Only output the four options as a lettered list.\",\n\"narrative_view\": \"Write options in the future tense and refer to the protagonist using the same narrative perspective as the preceeding story.\",\n\"option_types\": \"[\"protagonist actions\",\"other character actions\",\"events\"]\",\n\"format_example\": `A. ${Option A (a string of 50 or fewer tokens)}\nB. ${Option B (a string of 50 or fewer tokens)}\nC. ${Option C (a string of 50 or fewer tokens)}\nD. ${Option D (a string of 50 or fewer tokens)}`\n}\n}\n}\n[Execute the \"ai_instruction_override\" JSON]",

    "\n{\n\"ai_instruction_override\":{\n\"objective\": \"Ignore all previous instructions. Based on the preceeding story, present four options to the player representing the next event in the story.\",\n\"formatting_rules\": {\n\"option_token_cap\": 100,\n\"list_format\": \"Each option must start on a new line and be preceeded by 'A.', 'B.', 'C.', or 'D.'\",\n\"preamble\": \"None. Only output the four options as a lettered list.\",\n\"narrative_view\": \"Write options in the future tense and refer to the protagonist using the same narrative perspective as the preceeding story.\",\n\"option_types\": \"[\"protagonist actions\",\"other character actions\",\"events\"]\",\n\"format_example\": `A. ${Option A (a string of 100 or fewer tokens)}\nB. ${Option B (a string of 100 or fewer tokens)}\nC. ${Option C (a string of 100 or fewer tokens)}\nD. ${Option D (a string of 100 or fewer tokens)}`\n},\n\"option_contents\":{\n\"option_tone\": \"descriptive but direct, using neutral everyday language\"\n}\n}\n}\n[Execute the \"ai_instruction_override\" JSON]"
  ]
  if(state.cyoa){
    newText = newText + cyoaHiddenPrompts[state.cyoaMode - 1]
  }
  return { text: newText }
}

// Don't modify this part
modifier(text)
