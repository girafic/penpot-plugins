import 'ses';
import './lib/plugin-modal';

import { ɵloadPlugin } from './lib/load-plugin';
import { setFileState, setPageState, setSelection } from './lib/api';
import { parseFile } from './lib/utils';

repairIntrinsics({
  evalTaming: 'unsafeEval',
});

globalThis.ɵloadPlugin = ɵloadPlugin;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function initialize(api: any) {
  console.log('plugin context');

  globalThis.ɵloadPlugin = ɵloadPlugin;

  console.log(api);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api.addListener('plugin-page', 'page', (page: any) => {
    console.log('Page Changed:', page);

    setPageState(page);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api.addListener('plugin-file', 'file', (file: any) => {
    // console.log('File Changed (parsed):', parseFile(file));

    console.log('File Changed:', file);

    setFileState(file);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api.addListener('plugin-selection', 'selection', (selection: any) => {
    console.log('Selection Changed:', selection);

    setSelection(selection?.linked_map?.head?.uuid);
  });
}
