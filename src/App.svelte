<script lang="ts">
  import { onMount } from "svelte";
  import {
    Action,
    ActionNameMap,
    Game,
    GameNameMap,
    randomFromArray,
    valuesOfEnum,
  } from "./data";
  import {
    bored,
    health,
    hunger,
    maturationThreshold,
    playing,
    stage,
    stageName,
    start,
    time,
  } from "./store";

  time.subscribe((time) => {
    if (time >= $maturationThreshold) $stage += 1;
    $hunger += 0.01;
    $bored += 0.01;
  });

  onMount(() => {
    setInterval(() => {
      $time = Math.floor((new Date() - start) / 1000);
    }, 1000);
  });

  const ActionHandlers = {
    [Action.Feed]() {
      $hunger *= 0.5;
      if ($hunger < 0.2) $hunger = 0;
    },
    [Action.Game]() {
      const games = valuesOfEnum(Game);
      $playing = randomFromArray(games);
      $bored *= 0.2;
    },
  };
</script>

<aside>
  {#if $playing === Game.GuessTheNumber}
    <dialog open>
      <h1>{GameNameMap[$playing]}</h1>
      <button title="close" on:click={() => ($playing = undefined)}>
        &times;
      </button>
    </dialog>
  {:else if $playing === Game.RockPaperScissors}
    <dialog open>
      <h1>{GameNameMap[$playing]}</h1>
      <button title="close" on:click={() => ($playing = undefined)}>
        &times;
      </button>
    </dialog>
  {/if}
  <table>
    <tbody>
      <tr>
        <th>Time</th>
        <td>{$time}</td>
      </tr>
      <tr>
        <th>Stage</th>
        <td>{$stageName.slice(0, 1).toUpperCase() + $stageName.slice(1)}</td>
      </tr>
      <tr>
        <th>Health</th>
        <td>
          <input max="1" min="0" step="0.01" type="range" value={$health} />
        </td>
        <td>
          <output>{($health * 100).toFixed(0)}%</output>
        </td>
      </tr>
      <tr>
        <th>Hunger</th>
        <td>
          <input max="1" min="0" step="0.01" type="range" value={$hunger} />
        </td>
        <td>
          <output>{($hunger * 100).toFixed(0)}%</output>
        </td>
      </tr>
      <tr>
        <th>Boredom</th>
        <td>
          <input max="1" min="0" step="0.01" type="range" value={$bored} />
        </td>
        <td>
          <output>{($bored * 100).toFixed(0)}%</output>
        </td>
      </tr>
    </tbody>
  </table>
</aside>
<article>
  <img alt="stage {$stageName}" src="/stage/{$stageName}.gif" />
</article>
<footer>
  <menu>
    {#each Object.entries(ActionNameMap) as [action, name]}
      <li>
        <button title={name} on:click={ActionHandlers[action]}>
          <img src="/action/{name}.png" alt={name} />
        </button>
      </li>
    {/each}
  </menu>
</footer>

<style lang="css">
  header {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  menu {
    list-style-type: none;
    margin: 0;
    padding: 0;
    gap: 1em;
    display: flex;
    flex-wrap: wrap;
  }

  menu button {
    display: grid;
    place-content: center;
  }

  button img {
    width: 5em;
    height: 5em;
    object-fit: contain;
  }

  th {
    text-align: left;
  }

  td:last-child {
    min-width: 6ch;
    text-align: right;
  }
</style>
