const KEYS = {
    transfers: 'transfers',
    transferId: 'transferId'
}

export function insertTransfer(data) {
    let transfers = getAllTransfers();
    data['id'] = generateTransferId()
    transfers.push(data)
    localStorage.setItem(KEYS.transfers, JSON.stringify(transfers))
}

export function generateTransferId() {
    if (localStorage.getItem(KEYS.transferId) == null)
        localStorage.setItem(KEYS.transferId, '0')
    var id = parseInt(localStorage.getItem(KEYS.transferId))
    localStorage.setItem(KEYS.transferId, (++id).toString())
    return id;
}

export function getAllTransfers() {
    if (localStorage.getItem(KEYS.transfers) == null)
        localStorage.setItem(KEYS.transfers, JSON.stringify([]))
    let transfers = JSON.parse(localStorage.getItem(KEYS.transfers));
    return transfers;
}