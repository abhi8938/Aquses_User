import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import MeUsercard from '../ListItems/MeUserCard';
import MePlayerStats from '../ListItems/MePlayerStats';
import Navlist from '../components/NavList';
import { getUserCard } from '../../ApiRequests/GetRequest';

class MeLibraryList extends Component {  
    state={ 
        clientDetails: {},
        loading:false 
    }
 componentDidMount(){
    this.didBlurSubscription = this.props.navigation.addListener(
        'didFocus',
       async payload => {
        this.setState({ loading:true});
   const client = await getUserCard();
//    console.log(client);
    this.setState({ clientDetails: client});
    this.setState({ loading:false});
});
}
componentWillUnmount(){
    this.didBlurSubscription.remove();
}

    render() {
        return (
            <ScrollView>
                <MeUsercard details={this.state.clientDetails} />
                <MePlayerStats details={this.state.clientDetails} />
                <Navlist details={this.state.clientDetails} navigation={this.props.navigation}/>
            </ScrollView>
        );
    }
}
export default MeLibraryList;
