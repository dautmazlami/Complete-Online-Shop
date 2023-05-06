function handleErrors(error, req, res, next) {

    if (error.code === 404) {
        return res.status(404).render('shared/404');
    }

    console.log(error)
    res.status(500).render('shared/500');
}

module.exports = handleErrors;