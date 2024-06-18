import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;