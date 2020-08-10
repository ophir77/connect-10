export function assignErrors(errors) {
    return _.mapValues(errors, (errorArray) => {
        return errorArray.join(",")
    })
}

export function assignValues(firstObj, optionalObj) {
    function from(secondObj) {
        firstObj.objForEach((value, key) => {
            firstObj[key] = secondObj && secondObj.hasOwnProperty(key) ? secondObj[key] : value
        })
        return firstObj
    }

    function to(secondObj) {
        secondObj.objForEach((value, key) => {
            secondObj[key] = firstObj && firstObj.hasOwnProperty(key) ? firstObj[key] : value
        })
        return secondObj
    }

    if (optionalObj) {
        return from(optionalObj)
    }

    return {
        from,
        to
    }
}

export function clearErrors(errors, elementName) {
    if (_.has(errors, elementName)) {
        delete errors.elementName
    }
    return errors
}

export function clearForm(formData) {
    formData.objForEach((value, key) => {
        formData[key] = ''
    })
    return formData
}

export function handleErrors(error) {
    const data = error.response ? error.response.data : {}
    const toReturn = data.errors ? assignErrors(data.errors) : {}

    if (Object.keys(toReturn)
        .length) {
        if (toReturn.message) {
            Vue.toasted.error(toReturn.message, toastConfig)
        } else {
            Vue.toasted.error($t('misc.form_some_error'), toastConfig)
        }
        return toReturn
    }

    if (data.message) {
        Vue.toasted.error(data.message, toastConfig)
    } else {
        // debugger
        Vue.toasted.error($t('misc.error_unknown'), toastConfig)
    }
    return toReturn
}

export function isUnchanged(initialFormData, formData) {
    // let unchanged = true
    // formData.objForEach((value, key) => {
    //     if(initialFormData.hasOwnProperty(key) && formData.hasOwnProperty(key) && !_.isEqual(initialFormData[key], formData[key])) {
    //         unchanged = false
    //     }
    // })

    // return _.isEqual(initialFormData, formData) || unchanged

    return _.isEqual(initialFormData, formData)
}

export function areEqual(initialFormData, formData) {
    return _.isEqual(initialFormData, formData)
}

export function unsavedCheckAlert(initialFormData, formData, next) {

    if (!isUnchanged(initialFormData, formData)) {
        swtAlert.fire({
                title: $t('misc.unsaved_confirm.title'),
                text: $t('misc.unsaved_confirm.text'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: $t('misc.unsaved_confirm.confirm_btn'),
                cancelButtonText: $t('misc.unsaved_confirm.cancel_btn'),
            })
            .then((result) => {
                if (result.value) {
                    next(true)
                } else {
                    next(false)
                }
            })
    } else {
        next()
    }
}

export function confirmAction() {
    return swtAlert.fire({
        title: $t('misc.action_confirm.title'),
        text: $t('misc.action_confirm.text'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: $t('misc.action_confirm.confirm_btn'),
        cancelButtonText: $t('misc.action_confirm.cancel_btn'),
    })
}

export function generateSlug(from) {
    return from.toLowerCase()
        .trim()
        .replace(/[^\w -]+/g, '')
        .replace(/\s+/g, '-')
}

export function toSnakeCase(from) {
    return from.toLowerCase()
        .trim()
        .replace(/[^\w _]+/g, '')
        .replace(/\s+/g, '_')
}

export function toCamelCase(from) {
    return from.replace(/(\-[a-z])/g, function($1) {
        return $1.toUpperCase()
            .replace('-', '')
    })
}

export function toTitleCase(from) {
    return from.replace(/\w\S/g, function(t) {
        return t.toUpperCase()
    })
}

export function getExcerpt(content, charLimit, wordLimit) {
    content = content.replace(/\s+/g, ' ')

    if(charLimit) {
        if (content.length < charLimit) {
            return content
        } else {
            return content.substring(0, charLimit)
        }
    } else if(wordLimit) {
        const wordsArr = content.split(' ')
        if (wordsArr.length < wordLimit) {
            return content
        } else {
            return wordsArr.splice(0, wordLimit).join(" ")
        }
    }
    return content
}

export function stripHtml(value) {
    let div = document.createElement("div")
    div.innerHTML = value
    return div.textContent || div.innerText || ""
}

export function clearFormConditionally(formData, initialFormData, keepAddingOption, keepAddingSelectedFields = []) {
    if (keepAddingOption === 'clear_all_but_selected') {
        let newFormData = _.cloneDeep(initialFormData)
        keepAddingSelectedFields.forEach(({ uuid, val }) => {
            newFormData[uuid] = formData[uuid]
        })
        formData = newFormData
    } else if (keepAddingOption === 'clear_only_selected') {
        let newFormData = _.cloneDeep(formData)
        keepAddingSelectedFields.forEach(({ uuid, val }) => {
            newFormData[uuid] = initialFormData[uuid]
        })
        formData = newFormData
    } else {
        formData = _.cloneDeep(initialFormData)
    }
    return formData
}
