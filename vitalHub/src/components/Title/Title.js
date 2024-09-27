import { Title, TitleMonth, TitleName, TitleWelcome } from "./StyleTitle";

export const TitleNm = ({ textTitle }) => {

    return (
        <Title>
            {textTitle}
        </Title>
    )
}

export const NameTitle= ({ textTitle }) => {

    return (
        <TitleName>
            {textTitle}
        </TitleName>
    )
}

export const WelcomeTitle= ({ textTitle }) => {

    return (
        <TitleWelcome>
            {textTitle}
        </TitleWelcome>
    )
}

export const MonthTitle= ({ textTitle }) => {

    return (
        <TitleMonth>
            {textTitle}
        </TitleMonth>
    )
}