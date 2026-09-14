import pageTitle from 'ember-page-title/helpers/page-title';
import Scoreboard from 'classic-hamster-wacking/components/scoreboard';
import RouteTemplate from 'ember-route-template';

export default RouteTemplate(
  <template>
    {{pageTitle 'Classic Hamster Wacking'}}

    <Scoreboard />

    {{outlet}}
  </template>,
);
