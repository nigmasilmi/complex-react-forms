# Take care about UX + functionality

1. Validate but also, give feedback
2. Always validate client-side and server-side, both

## When to validate?

1.  When form is submitted
2.  When an input is losing focus
3.  On every keystroke ----???

### Let the user input something before telling there is an error

This is done by setting a validation onBlur event

### Let the user know that there is no error anymore if he/she corrects it

This is done by validating on every keystroke --- but implement with caution

### Don't wait for the user to submit the form to give him/her a feedback

Don't validate just onSubmit
