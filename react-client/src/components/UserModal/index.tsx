import React from "react";
import {AuthStore} from "../../stores/modules/authStore";

interface IProps {
    authStore: AuthStore;
    closeModal: () => void;
}

export default class Chat extends React.Component<IProps, {}> {
}