'use babel';

import ChequeoTareas from '../lib/chequeo-tareas';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('ChequeoTareas', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('chequeo-tareas');
  });

  describe('when the chequeo-tareas:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.chequeo-tareas')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'chequeo-tareas:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.chequeo-tareas')).toExist();

        let chequeoTareasElement = workspaceElement.querySelector('.chequeo-tareas');
        expect(chequeoTareasElement).toExist();

        let chequeoTareasPanel = atom.workspace.panelForItem(chequeoTareasElement);
        expect(chequeoTareasPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'chequeo-tareas:toggle');
        expect(chequeoTareasPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.chequeo-tareas')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'chequeo-tareas:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let chequeoTareasElement = workspaceElement.querySelector('.chequeo-tareas');
        expect(chequeoTareasElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'chequeo-tareas:toggle');
        expect(chequeoTareasElement).not.toBeVisible();
      });
    });
  });
});
