import { StyledCalendarStrip } from "./StyleCalendar";
// Importa a biblioteca moment
import moment from "moment";

import { StyleSheet } from 'react-native';


// Componente de calendário
const Calendar = () => {

    // Define o padrão para o calendário em Português do Brasil
    moment.updateLocale("pt-br", {
        //meses
    months:
    "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
      "_"
    ),

  //abreviação de meses
  monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),

  //dias da semana
  weekdays:
    "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split(
      "_"
    ),

  //abreviação dias da semana
  weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),

  //abreviação dias da semana
  weekdaysMin: "dom_2ª_3ª_4ª_5ª_6ª_sáb".split("_"),
});


    // Cria uma instância da data atual
    const currentDate = new Date();

    // Define a data inicial como sendo o primeiro dia do mês
    const startingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Define a data final como sendo o último dia do mês
    const endingDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    return (
        <StyledCalendarStrip
            // Configuração da animação do calendário
            calendarAnimation={{ type: "sequence", duration: 30 }}
            // Estilo da animação de seleção do dia
            daySelectionAnimation={styles.selectedAnimationStyle}
            // Estilo do ícone de navegação para a esquerda
            iconLeftStyle={styles.iconsStyle}
            // Estilo do ícone de navegação para a direita
            iconRightStyle={styles.iconsStyle}
            // Data selecionada no calendário
            selectedDate={currentDate}
            // Data inicial permitida no calendário
            startingDate={moment()}
            // Data mínima permitida no calendário
            minDate={startingDate}
            // Data máxima permitida no calendário
            maxDate={endingDate}
            // Estilo do cabeçalho do calendário
            calendarHeaderStyle={styles.calendarHeaderStyle}
            // Estilo do número do dia
            dateNumberStyle={styles.numberDateStyle}
            // Estilo do nome do dia
            dateNameStyle={styles.nameDateStyle}
            // Estilo do nome do dia selecionado
            highlightDateNameStyle={styles.selectedDateNameStyle}
            // Estilo do número do dia selecionado
            highlightDateNumberStyle={styles.selectedDateNumberStyle}
            // Estilo do contêiner do dia selecionado
            highlightDateContainerStyle={styles.selectedContainerStyle}
            // Estilo do contêiner do ícone
            iconContainer={{ flex: 0.1 }}
            // Permite a rolagem do calendário
            scrollable={true}
        />
    )
}
const styles = StyleSheet.create({
    iconsStyle: {
        display: 'none'
    },
    calendarHeaderStyle: {
        fontSize: 24,
        textAlign: "center",
        alignSelf: 'flex-start',
        color: '#4E4B59',
        fontFamily: "MontserratAlternates_600SemiBold",
        paddingHorizontal: 35,
        marginBottom: 10
    },
    nameDateStyle: {
        color: "#ACABB7",
        fontSize: 12,
        textTransform: 'capitalize'
    },
    numberDateStyle: {
        color: "#5F5C6B",
        fontSize: 16
    },
    selectedDateNameStyle: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        textTransform: 'capitalize'
    },
    selectedDateNumberStyle: {
        color: "white",
        fontSize: 14
    },
    selectedContainerStyle: {
        backgroundColor: `#60BFC5`
    },
    selectedAnimationStyle: {
        type: "border",
        duration: 200,
        borderWidth: 2,
        borderHighlightColor: "#49B3BA"
    }
})

export default Calendar;