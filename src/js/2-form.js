import '../css/styles.css';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
    email: '',
    message: ''
};

const saved = localStorage.getItem(STORAGE_KEY);

if (saved) {
    try {
        const parsed = JSON.parse(saved);
        formData = { ...formData, ...parsed };

        if (form.elements.email) {
            form.elements.email.value = formData.email ?? '';
        }

        if (form.elements.message) {
            form.elements.message.value = formData.message ?? '';
        }
    } catch (e) {
        console.error('Error parsing saved form data:', e);
    }
}

form.addEventListener('input', (event) => {
    const { name, value } = event.target;

    if (name in formData) {
        formData[name] = value.trim();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const { email, message } = formData;

    if (!email || !message) {
        alert('Fill please all fields');
        return;
    }

    console.log('Submitted form data:', formData);

    localStorage.removeItem(STORAGE_KEY);
    formData = { email: '', message: '' };
    form.reset();
});
