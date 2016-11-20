'use babel';

import { CompositeDisposable } from 'atom'

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'chequeo-tareas:palabraIncorrecta': () => this.palabraIncorrecta(),
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },
  
  palabraIncorrecta() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.moveToBeginningOfWord()
      editor.insertText("<palabra_incorrecta>")
      editor.moveToEndOfWord() 
      editor.insertText("</palabra_incorrecta>")
    }
  }
};
