import {FlatList, TouchableOpacity, ImageBackground, Image} from 'react-native'
import React, {useState} from 'react'
import * as Animatable from 'react-native-animatable'
import {icons} from "../constants";
import {useVideoPlayer, VideoView} from "expo-video";

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1.1,
    }
}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9,
    }
}

const TrendingItem = ({activeItem, item}) => {
    const [play, setPlay] = useState(false);
    const videoSource = {uri : item.video}
    //console.log('Videosource', videoSource)

    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });
    
    return (
        <Animatable.View
        className="mr-5"
        animation={activeItem === item.$id ? zoomIn : zoomOut}
        duration={500}>
            {play ? (
                <VideoView
                    player={player}
                    style={{ width: 208, height: 288, borderRadius: 33, marginTop: 12, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    resizeMode="contain"
                    useNativeControls
                    onPlaybackFinish={() => setPlay(false)}
                />
            ): (
                <TouchableOpacity className="relative justify-center items-center"
                activeOpacity={0.7}
                onPress={() => setPlay(true)}>
                    <ImageBackground
                    source={{
                        uri: item.thumbnail
                    }}
                    className="w-52 h-72 rounded-[35px] my-5
                    overflow-hidden shadow-lg shadow-black-40"
                    resizeMode="cover"/>
                    <Image source={icons.play}
                    className="w-12 h-12 absolute"
                    resizeMode='contain'/>
                </TouchableOpacity>
                )}
        </Animatable.View>
    )
}

const Trending = ({posts}) => {
    const [activeItem, setActiveItem] = useState(posts[0]);

    const viewableItemsChanged = ({viewableItems}) => {
        if(viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    };
    return (
        <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
            <TrendingItem
            activeItem={activeItem} item={item}/>
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
            itemVisiblePercentThreshold: 70,
        }}
        contentOffset={{ x: 170 }}
        horizontal/>
    )
}
export default Trending
