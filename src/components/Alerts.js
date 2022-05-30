// Bootstrap alerts

export const alertSuccess = (message) => {
    return (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
            {message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
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