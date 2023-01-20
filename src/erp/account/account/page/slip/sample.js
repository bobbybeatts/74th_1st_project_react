import { useSelector } from 'react-redux';

const fruitList = useSelector(state => state.fruit);
// useSelector의 사용법

// modules/fruit.js -  fruit이라는 기능을 가진 리듀서

// 액션
const SET_FRUIT_LIST = "fruit/SET_FRUIT_LIST";

// 액션 생성 함수
export const setFruitList = fruistList => ({ type : SET_FRUIT_LIST, fruitList });

// 초기값
const initialState = {
  name: false,
  price: false,
};

// 리덕스 스토어값 변경
export default function fruit(state = initialState, action) {
  switch(action.type) {
    case SET_FRUIT_LIST :
      return {
        ...state,
        name: action.fruitList,
      };
    default:
      return state;
  }
}


const fruit = useSelector(state => state.fruit);

dispatch(setFruitList('딸기')); // 액션 호출

console.log(fruit.name); // '딸기'
console.log(fruit.price); // false