'use babel';

import { CompositeDisposable } from 'atom'

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'chequeo-tareas:palabraIncorrecta': () => this.addTags("<palabra_incorrecta>","</palabra_incorrecta>"),
      'chequeo-tareas:conjugacionIncorrecta': () => this.addTags("<conjugacion_incorrecta>","</conjugacion_incorrecta>"),
      'chequeo-tareas:problemaConcordancia': () => this.addTags("<problema_concordancia>","</problema_concordancia>"),
      'chequeo-tareas:innecesario': () => this.addTags("<innecesario>","</innecesario>"),
      'chequeo-tareas:palabraOmitida': () => this.insertTag("<palabra_omitida>","</palabra_omitida>"),
      'chequeo-tareas:problemaOrtografico': () => this.addTags("<problema_ortografico>","</problema_ortografico>")
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },
  
  insertTag(open, close) {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.insertText(open + close)
    }
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
