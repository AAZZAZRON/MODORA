// if site is bad site and we are in "lockdown", do not let site open
function blockWebsite(details) {
    return {cancel: true};
}

