// Bootstrap alerts
// window.setTimeout(function () {
//     $(".alert").fadeTo(500, 0).slideUp(500, function () {
//         $(this).remove();
//     });
// }, 1000);

export const alertSuccess = (message) => {
    return (
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            {message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export const alertError = (message) => {
    return (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
            <div>
                {message}
            </div>
        </div>
    )
}