'use babel';

import { CompositeDisposable } from 'atom'

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'chequeo-tareas:palabraIncorrecta': () => this.addTags("<palabra_incorrecta>","</palabra_incorrecta>"),
      'chequeo-tareas:conjugacionIncorrecta': () => this.addTags("<conjugacion_incorrecta>","</conjugacion_incorrecta>"),
      'chequeo-tareas:problemaOrtografico': () => this.addTags("<problema_ortografico>","</problema_ortografico>")
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },
  
  addTags(open, close) {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.moveToBeginningOfWord()
      editor.insertText(open)
      editor.moveToEndOfWord() 
      editor.insertText(close)
    }
  }
};
