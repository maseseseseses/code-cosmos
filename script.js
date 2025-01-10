// Handle intro animation and form transition
document.getElementById('startBtn').addEventListener('click', function() {
    document.title = "Application";
    
    const intro = document.getElementById('intro');
    const formSection = document.getElementById('formSection');
    
    intro.style.opacity = '0';
    intro.style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
        intro.style.display = 'none';
        formSection.style.display = 'block';
        formSection.style.opacity = '0';
        
        setTimeout(() => {
            formSection.style.opacity = '1';
            formSection.style.transition = 'opacity 0.5s ease-in';
        }, 50);
    }, 500);
});

// Handle form submission to Discord webhook
document.getElementById('mod-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    // Replace 'YOUR_WEBHOOK_URL' with your actual Discord webhook URL
    const webhookURL = 'https://discord.com/api/webhooks/1326984365623869501/Vgu8IxWyC2bykgg616HbwJSMAQA1tWer9Oo2x5GBrutJryHObFkJXdx-VGSa9Bq26uZl';
    
    const message = {
        embeds: [{
            title: '📝 New Moderator Application',
            color: 0x7289DA,
            fields: [
                {
                    name: 'Discord Username',
                    value: formData.get('discord-username')
                },
                {
                    name: 'Age',
                    value: formData.get('age')
                },
                {
                    name: 'Timezone',
                    value: formData.get('timezone')
                },
                {
                    name: 'Previous Experience',
                    value: formData.get('experience')
                },
                {
                    name: 'Why Mod?',
                    value: formData.get('why')
                },
                {
                    name: 'Toxic User Scenario',
                    value: formData.get('scenario')
                }
            ],
            timestamp: new Date()
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        if (response.ok) {
            alert('Application submitted successfully!');
            this.reset();
        } else {
            alert('Error submitting application. Please try again.');
        }
    })
    .catch(error => {
        alert('Error submitting application. Please try again.');
        console.error('Error:', error);
    });
});
