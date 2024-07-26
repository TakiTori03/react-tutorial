import _ from 'lodash'

const Question = (props) => {
    const { data, index } = props;
    if (_.isEmpty(data)) {
        return (
            <></>
        )
    }


    const handleHandleCheckBox = (event, aId, qId) => {
        // console.log('check: ', event.target.checked);
        // console.log("\ncheck answer id =>>>", aId, "\ncheck question id =>>>", qId);
        props.handleCheckBox(aId, qId);

    }
    return (
        <>
            <div className='q-image'>
                {data && data.image ?
                    <img src={`data:image/jpeg;base64,${data.image}`} alt="question image" />
                    : <div className='q-image'></div>
                }

            </div>
            <div className="question">
                Question{index + 1} : {data.questionDescription}
            </div>
            <div className="answer">
                {data.answers && data.answers.length &&
                    data.answers.map((answer, index) => {
                        return (
                            <div
                                key={`answer-${index}`}
                                className='a-child'>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        value="" checked={answer.isSelected}
                                        onChange={(event) => handleHandleCheckBox(event, answer.id, data.questionId)} />
                                    <label className="form-check-label" >
                                        {answer.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })}
                {/* <div className="a-child">A . First answer</div>
                <div className="a-child">B . Second answer</div>
                <div className="a-child">C . Third answer</div> */}
            </div>
        </>
    )
}
export default Question;