function addSymbolToString(text, sym) {
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
