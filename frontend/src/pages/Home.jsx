import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getVocabularys } from "../features/vocabulary/vocabularySlice"
import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit"
const Home = () => {
    const dispatch = useDispatch()
    const { speak, voices } = useSpeechSynthesis()
    const [value, setValue] = useState('');
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setValue(result );
        },
    });

    //  console.log(voices)


    useEffect(() => {
        dispatch(getVocabularys())
    }, [])

    const vocabulary = useSelector((state) => state.vocabulary.vocabularys)

    // function handleSpeak() {
    //     speak({ text: text, rate: 0.7, voice: voices[voiceIndex] })
    // }

    const handleSpeakText = (textItem) => {

        speak({ text: textItem, rate: 0.6, voice: voices[5] })
    }





    return (
        <>
            <div style={{left:0,position:'fixed'}}>
                <textarea
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    rows='4'
                    cols='40'
                />
                {/* ({interimResults: true,lang:"en-US"}) */}
                <br/>
                <button onMouseDown={()=>listen({lang:'en-US'})} onMouseUp={stop}>
                    🎤
                </button><br/>
                <button onClick={()=>setValue('')}>Clear</button>
                {listening && <div>Go ahead Im listening</div>}
            </div>
            {/* <textarea
                rows='5'
                cols='50'
                placeholder="Enter some text here"
                onChange={(e) => setText(e.target.value)}
            />
            <br />
            <select style={{ width: '100px' }}
            value={voiceIndex}
                onChange={(e) => setVoiceIndex(e.target.value)}
            >
                <option value=''>default</option>
                {
                    voices.map((item, index) => {
                        <option key={index} value={index}>
                            {item.name}
                        </option>
                    })
                }
            </select>
            <button onClick={() => handleSpeak()}>Speak</button> */}
            <div style={{
                // display: 'flex',
                // flexDirection: 'column',
                // backgroundColor: 'lightgray',
                // padding: '20px',
                // borderRadius: '8px',
                // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                // marginBottom: '20px',
            }}>

                {vocabulary.map((item, index) => {
                    return (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'lightgray',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            marginBottom: '20px',
                        }} key={index}>
                            <ul style={{ listStyle: "none" }}>
                                <li>{item.vocabulary} : {item.mean}</li>
                                <li>
                                    <ol>
                                        {item.text.map((text, index) => {
                                            return (
                                                <li key={index}>{text.text}<button onClick={() => handleSpeakText(text.text)}>Listen</button>
                                                    <br />

                                                    {text.textVocabulary.map((textVocabulary, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <span>{textVocabulary.vocabulary}:{textVocabulary.mean}</span>
                                                            </div>
                                                        )
                                                    })}
                                                    {text.textTranslate.map((translate, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <span>{translate.textTranslate}</span>
                                                                <hr />
                                                            </div>
                                                        )
                                                    })}
                                                </li>

                                            )
                                        })}</ol></li>
                            </ul>
                        </div>
                    )
                })}
            </div >
        </>
    )
}

export default Home