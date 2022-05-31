import React, { useEffect, useState } from "react";
import {
    View,
    VStack,
    Image,
    Button,
    Icon,
} from "native-base";
import {
    StyleSheet, 
} from "react-native";
import Typography from "../components/Typography";
import { MaterialIcons,FontAwesome } from "@expo/vector-icons";

const Test = ({navigation,route}) => {
    const { listWord } = route.params;
    // const [formatListWord,setFormatListWord] = useState([]);
    const [listWordPractice,setListWordPractice] = useState([]);
    const [count,setCount] = useState(null);
    const [maxCount,setMaxCount] = useState(null);
    const [isShowAnswer,setIsShowAnswer] = useState(false);
    const [numClick,setNumClick] = useState(null);

    const generateRandomNumber = (startNum,endNum) => {
        return Math.floor(Math.random() * endNum) + startNum;
    }

    // const generateFormatListWord = () => {
    //     let result = []
    //     for(var i = 0;i<listWord.length;i++){
    //         let listMean = JSON.parse(listWord[i].mean);
    //         for(var j = 0;j < listMean.length;j++){
    //             result.push({name: listWord[i].title,type: listMean[j].type,means:listMean[j].means});
    //         }
    //     }
    //     console.log("result");
    //     console.log(result);
    //     setFormatListWord(result);
    // }

    useEffect(() => {
        // generateFormatListWord();
        createListWordPractice();
    },[]);

    const createListQuestion = (answer) => {
        let temp = [];
        let result = [];
        for(var i = 0;i<listWord.length;i++){
            let listMean = JSON.parse(listWord[i].mean);
            for(var j = 0;j < listMean.length;j++){
                if (listMean[j].means !== answer){
                    temp.push({name: listWord[i].title,type: listMean[j].type,means:listMean[j].means});
                }
            }
        }
        let randAnswer = generateRandomNumber(0,3);
        for(var i = 0;i<3;i++){
            temp.map(word => result.filter(e => e === word.means).length === 0 ? result.push(word.means) : null);
        }
        result.splice(randAnswer,0,answer);
        return result;
    }

    const createListWordPractice = () => {
        setCount(0);
        let lst = [];
        for(var i = 0;i<listWord.length;i++){
            let listMean = JSON.parse(listWord[i].mean);
            for(var j = 0;j < listMean.length;j++){
                lst.push({name: listWord[i].title,type: listMean[j].type,means:listMean[j].means,listQuestion:createListQuestion(listMean[j].means)});
            }
            if(lst.length > 10){
                break;
            }
        }
        // > 10 vocabulary
        if (lst.length > 10) {
            setMaxCount(10);
            setListWordPractice(lst.slice(0,10));
        }
        // 4 - 10 vocabulary
        else{
            setMaxCount(lst.length);
            setListWordPractice(lst);
        }
    }

    const onPressAnswer = (id) => {
        setIsShowAnswer(true);
        setNumClick(id);
    }

    const onPressNextQuestion = () => {
        setCount(count + 1);
        setIsShowAnswer(false);
        setNumClick(null);
    }

    return (
        <View style={{flex: 1}} bg="primary.2">
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 0.1}}></View>

                <View style={{flex: 0.3}} >
                    <VStack
                        style={{ width: "100%", height: "100%" }}
                        space={4}
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        <Icon as={FontAwesome} name="chevron-left" size={6} color="rgba(102, 102, 102, 1)" onPress={() => navigation.goBack()}/>
                    </VStack>
                </View>

                <View style={{flex: 1.5}}>
                    <VStack
                        style={{ width: "100%", height: "100%" }}
                        space={4}
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        <Typography variant="testStt" color="rgba(102, 102, 102, 1)">{count + 1} / {maxCount}</Typography>
                    </VStack>
                </View>

                <View style={{flex: 0.3}}>
                    <VStack
                        style={{ width: "100%", height: "100%" }}
                        space={4}
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                    </VStack>
                </View>
                
                <View style={{flex: 0.1}} ></View>
            </View>

            <View style={{flex: 4}} >
                <VStack
                    style={{ width: "100%", height: "100%"}}
                    alignItems="center"
                    justifyContent="center"
                >
                <Typography variant="vocalTextE" color="text.dark">{listWordPractice.length > 1 ? listWordPractice[count].name : null} ({listWordPractice.length > 1 ? listWordPractice[count].type : null})</Typography>
                <Image 
                    source={{
                        uri: "https://wallpaperaccess.com/full/317501.jpg"
                    }} 
                    size="48"
                    alt="default image"
                />
                </VStack>
            </View>

            <View style={{flex: 5}} >
                <VStack
                    style={{ width: "100%", flex:4, paddingHorizontal:10 }}
                    justifyContent="center"
                    space={"md"}
                >
                    <Button disabled={isShowAnswer}
                        style={
                            isShowAnswer ? 
                                numClick === 0 ?
                                    listWordPractice[count].means === listWordPractice[count].listQuestion[0] ? 
                                        styles.trueAnswer
                                    :   styles. falseAnswer
                                :   listWordPractice[count].means === listWordPractice[count].listQuestion[0] ?
                                        styles.trueAnswer
                                    :   null
                            : null} 
                        onPress={(e) => onPressAnswer(0)}
                        endIcon={
                            isShowAnswer ? 
                                numClick === 0 ?
                                    listWordPractice[count].means === listWordPractice[count].listQuestion[0] ? 
                                        <Icon as={FontAwesome} name="check" size="lg" />
                                    :   <Icon as={FontAwesome} name="remove" size="lg" />
                                :   listWordPractice[count].means === listWordPractice[count].listQuestion[0] ?
                                        <Icon as={FontAwesome} name="check" size="lg" />
                                    :   null
                            : null
                        }
                    >
                        {listWordPractice.length > 0 ? listWordPractice[count].listQuestion[0] : null}
                    </Button>
                    <Button disabled={isShowAnswer}
                        style={
                            isShowAnswer ? 
                                numClick === 1 ?
                                    listWordPractice[count].means === listWordPractice[count].listQuestion[1] ? 
                                        styles.trueAnswer
                                    :   styles. falseAnswer
                                :   listWordPractice[count].means === listWordPractice[count].listQuestion[1] ?
                                        styles.trueAnswer
                                    :   null
                            : null}
                        onPress={(e) => onPressAnswer(1)}
                        endIcon={
                                isShowAnswer ? 
                                    numClick === 1 ?
                                        listWordPractice[count].means === listWordPractice[count].listQuestion[1] ? 
                                            <Icon as={FontAwesome} name="check" size="lg" />
                                        :   <Icon as={FontAwesome} name="remove" size="lg" />
                                    :   listWordPractice[count].means === listWordPractice[count].listQuestion[1] ?
                                            <Icon as={FontAwesome} name="check" size="lg" />
                                        :   null
                                : null
                        }
                    >
                        {listWordPractice.length > 0 ? listWordPractice[count].listQuestion[1] : null}
                    </Button>
                    <Button disabled={isShowAnswer}
                        style={
                            isShowAnswer ? 
                                numClick === 2 ?
                                    listWordPractice[count].means === listWordPractice[count].listQuestion[2] ? 
                                        styles.trueAnswer
                                    :   styles. falseAnswer
                                :   listWordPractice[count].means === listWordPractice[count].listQuestion[2] ?
                                        styles.trueAnswer
                                    :   null
                            : null} 
                        onPress={(e) => onPressAnswer(2)}
                        endIcon={
                            isShowAnswer ? 
                                numClick === 2 ?
                                    listWordPractice[count].means === listWordPractice[count].listQuestion[2] ? 
                                        <Icon as={FontAwesome} name="check" size="lg" />
                                    :   <Icon as={FontAwesome} name="remove" size="lg" />
                                :   listWordPractice[count].means === listWordPractice[count].listQuestion[2] ?
                                        <Icon as={FontAwesome} name="check" size="lg" />
                                    :   null
                            : null
                        }
                    >
                        {listWordPractice.length > 0 ? listWordPractice[count].listQuestion[2] : null}
                    </Button>
                    <Button disabled={isShowAnswer}
                        style={
                            isShowAnswer ? 
                                numClick === 3 ?
                                    listWordPractice[count].means === listWordPractice[count].listQuestion[3] ? 
                                        styles.trueAnswer
                                    :   styles. falseAnswer
                                :   listWordPractice[count].means === listWordPractice[count].listQuestion[3] ?
                                        styles.trueAnswer
                                    :   null
                            : null} 
                        onPress={(e) => onPressAnswer(3)}
                        endIcon={
                            isShowAnswer ? 
                                numClick === 3 ?
                                    listWordPractice[count].means === listWordPractice[count].listQuestion[3] ? 
                                        <Icon as={FontAwesome} name="check" size="lg" />
                                    :   <Icon as={FontAwesome} name="remove" size="lg" />
                                :   listWordPractice[count].means === listWordPractice[count].listQuestion[3] ?
                                        <Icon as={FontAwesome} name="check" size="lg" />
                                    :   null
                            : null
                        }
                    >
                        {listWordPractice.length > 0 ? listWordPractice[count].listQuestion[3] : null}
                    </Button>
                    
                </VStack>
                <VStack style={{flex:1}}
                    flexDirection="row"
                    justifyContent="center"
                >
                    {isShowAnswer && count !== maxCount - 1 ? 
                        <Button
                            style={{width:"30%", height:40}}
                            onPress={() => onPressNextQuestion()}
                            > 
                                Câu tiếp theo 
                            </Button> 
                    :   null}
                </VStack>
            </View>
        </View>
    );
}
export default Test;

const styles = StyleSheet.create({
    trueAnswer:{
        backgroundColor: "green"
    },
    falseAnswer:{
        backgroundColor: "red"
    }
});

