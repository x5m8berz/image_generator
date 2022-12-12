
function onSubmit(e) {
    e.preventDefault()

    const prompt = document.querySelector('#prompt').value
    const n = document.querySelector('#n').value
    const size = document.querySelector('#size').value

    if (prompt === ''){
        alert('Please add some text')
        return
    }else if(n === ''){
        alert('Please add the number')
        return
    }

    if(n > 10 || n < 0 ){
        alert('Number should be between 1 to 10')
    }

    document.querySelector('.msg').textContent = ''
    for(i = 0; i < 10; i++){
        document.querySelector(`#image${i}`).src = ''
    }
    
    generateImageRequest(prompt, n , size)
}

async function generateImageRequest(prompt, n, size){
    try {
        showSpinner()
        for (i = 0; i < n ; i++){
            const response = await fetch('/openai/generateimage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt,
                    n,
                    size,
                })
            })
            if(!response.ok){
                removeSpinner()
                throw new Error('Rate limit reached for images per minute. Limit: 20/1min')
            }
            
            const data = await response.json()
            const imageUrl = data.data
            document.querySelector(`#image${i}`).src = imageUrl
            
        }

        removeSpinner()

    } catch (error) {
        document.querySelector('.msg').textContent = error
    }
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show')
}

function removeSpinner(){
    document.querySelector('.spinner').classList.remove('show')
}

document.querySelector('#image-form').addEventListener('submit', onSubmit)