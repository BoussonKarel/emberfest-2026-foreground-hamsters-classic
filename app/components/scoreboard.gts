import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
import { on } from '@ember/modifier';
import type Owner from '@ember/owner';

export default class Scoreboard extends Component {
  @tracked score = 0;

  constructor(owner: Owner, args: object) {
    super(owner, args);

    chrome.storage.local.get(
      'score',
      ({ score = 0 }: { score?: number }) => (this.score = score),
    );
    chrome.storage.onChanged.addListener(this.onStorageChanged);

    registerDestructor(this, () =>
      chrome.storage.onChanged.removeListener(this.onStorageChanged),
    );
  }

  onStorageChanged = (
    changes: Record<string, chrome.storage.StorageChange>,
  ): void => {
    if (changes['score']) {
      this.score = changes['score'].newValue as number | undefined;
    }
  };

  reset = (): void => chrome.storage.local.set({ score: 0 });

  <template>
    <div class='scoreboard'>
      <p class='scoreboard-score'>
        Hamsters whacked:
        <span class='scoreboard-count'>{{this.score}}</span>
      </p>
      <button
        type='button'
        class='scoreboard-reset'
        {{on 'click' this.reset}}
      >Reset</button>
    </div>
  </template>
}
