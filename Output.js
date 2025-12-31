const modifier = (text) => {
    let newText = text
    if(state.cyoa){
        if (newText.startsWith('\n')){
            newText = newText.substring(1)
        }
        if (newText.endsWith('\n')){
            newText = newText.slice(0, -1)
        }
        newText = newText.trim()
        state.latestCyoa = newText
        newText = addSymbolToString(newText, "• ")
    }

    return { text : newText }
}

// Don't modify this part
modifier(text)
