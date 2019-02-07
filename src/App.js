import React, { Component } from 'react';
import { FluxService } from './data/services/FluxService';
import FluxList from './views/components/FluxList';
import NewFluxItem from './views/components/NewFluxItem';
import './App.css';

class App extends Component {

   constructor(props) {
      super(props);
      this.state = {
         fluxList: []
      }

      this.add = this.add.bind(this);
      this.remove = this.remove.bind(this);
      this.update = this.update.bind(this);


   }

   async componentDidMount() {
      const fluxList = await FluxService.list();
      this.setState({ fluxList });
   }

   add(description) {
      FluxService.create({
         description,
         isChecked: false
      }).then(newItem => {
         const { fluxList } = this.state;
         fluxList.push(newItem);
         this.setState({ fluxList });
      });
   }

   remove(id) {
      const { fluxList } = this.state,
         itemIndex = fluxList.findIndex(item => item.id === id)

      FluxService.remove(id).then(() => {
         fluxList.splice(itemIndex, 1);
         this.setState({ fluxList });
      });
   }

   update(description) {
      FluxService.update(description).then(() => {
         const { fluxList } = this.state,
            itemIndex = fluxList.findIndex(item => item.id === description.id)

         fluxList[itemIndex] = description;
         this.setState({ fluxList });
      });
   }

   render() {
      const { state } = this;
      return (
         <div className="App">
            <NewFluxItem onAdd={this.add} />
            <FluxList items={state.fluxList} onRemove={this.remove} onUpdate={this.update}/>
         </div>
      );
   }
}

export default App;
