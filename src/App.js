import React, { Component } from 'react';
import FluxList from './views/components/FluxList';
import NewFluxItem from './views/components/NewFluxItem';
import FluxActions from './data/actions/FluxActions';
import FluxStore from './data/stores/FluxStore';
import './App.css';

async function getFluxState(){
   return {
      fluxList: await FluxStore.getAll()
   }
}

class App extends Component {

   constructor(props) {
      super(props);
      this.state = {
         fluxList: []
      }

      this._onChange = this._onChange.bind(this);
      this._onChange();
   }

   componentDidMount() {
      FluxStore.addChangeListerner(this._onChange);
   }

   componentWillMount() {
      FluxStore.removeChangeListerner(this._onChange);

   }

   async _onChange() {
      this.setState(await getFluxState());
   }

   render() {
      const { state } = this;
      return (
         <div className="App">
            <NewFluxItem onAdd={FluxActions.create} />
            <button className="tw-btn" onClick={FluxActions.clear}>Limpar</button>
            <FluxList items={state.fluxList} onRemove={FluxActions.remove} onUpdate={FluxActions.update} />
         </div>
      );
   }
}

export default App;
