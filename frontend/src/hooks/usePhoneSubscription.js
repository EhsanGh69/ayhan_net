import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { phoneSubscriptionService } from "../services/phoneSubscriptionService"
import { detectImageFileFormat } from "../utils/detectFileFormat"


export const useUnknownPhoneSubscriptions = () => {
    const {
        data: unknownPhoneSubs, isLoading: unknownPhoneSubsLoading,
        error: unknownPhoneSubsErr, isError: isUnknownPhoneSubsErr
    } = useQuery({
        queryKey: ['unknownPhoneSubs'],
        queryFn: async () => {
            const data = await phoneSubscriptionService.getUnknownPhoneSubscriptions()
            return data
        },
        retry: 1
    })

    return { unknownPhoneSubs, unknownPhoneSubsLoading, unknownPhoneSubsErr, isUnknownPhoneSubsErr }
}


export const useUploadNidImage = () => {
    const queryClient = useQueryClient()
    const {
        mutateAsync: uploadNidImage, isError: isUploadNidImageErr, error: uploadNidImageErr
    } = useMutation({
        mutationFn: async ({ subsId, nidImage }) => {
            const data = await phoneSubscriptionService.newApplicantUploadNidImage(subsId, nidImage)
            return data
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['unknownPhoneSubs'] })
    })

    return { uploadNidImage, isUploadNidImageErr, uploadNidImageErr }
}

export const useDownloadNidImage = () => {
    const {
        mutateAsync: downloadNidImage, isPending: downloadNidImagePending,
        error: downloadNidImageErr, isError: isDownloadNidImageErr
    } = useMutation({
        mutationFn: async ({ id, fullname }) => {
            const response = await phoneSubscriptionService.newApplicantDownloadNidImage(id)
            return {
                fileData: response.data,
                headers: response.headers,
                fullname
            }
        },
        onSuccess: async (result) => {
            const fileExtension = await detectImageFileFormat(result.fileData)
            
            const fileName = `${result.fullname}_${Date.now()}${fileExtension}`;
            const url = window.URL.createObjectURL(new Blob([result.fileData]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
    })

    return {
        downloadNidImage, downloadNidImagePending,
        downloadNidImageErr, isDownloadNidImageErr
    }
}

export const useChangeSubscriptionStatus = () => {
    const queryClient = useQueryClient()
    const {
        mutateAsync: changeSubsStatus, isError: isChangeSubsStatusErr, error: changeSubsStatusErr
    } = useMutation({
        mutationFn: async ({ subsId, subsData }) => {
            const data = await phoneSubscriptionService
                .changePhoneSubscriptionStatus(subsId, subsData)
            return data
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['unknownPhoneSubs'] })
    })

    return { changeSubsStatus, isChangeSubsStatusErr, changeSubsStatusErr }
}

export const useChangeTechList = () => {
    const {
        data: changeTechList, isLoading: changeTechListLoading,
        error: changeTechListErr, isError: isChangeTechListErr
    } = useQuery({
        queryKey: ['changeTechList'],
        queryFn: async () => {
            const data = await phoneSubscriptionService.changeTechList()
            return data
        },
        retry: 1
    })

    return { changeTechList, changeTechListLoading, changeTechListErr, isChangeTechListErr }
}

export const useChangeTechAction = () => {
    const queryClient = useQueryClient()
    const {
        mutateAsync: changeTechAction, isError: isChangeTechActionErr, error: changeTechActionErr
    } = useMutation({
        mutationFn: async ({ subsId, techData }) => {
            const data = await phoneSubscriptionService.changeTechAction(subsId, techData)
            return data
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['changeTechList'] })
    })

    return { changeTechAction, isChangeTechActionErr, changeTechActionErr }
}

export const useNewApplicantList = () => {
    const {
        data: newApplicantList, isLoading: newApplicantListLoading,
        error: newApplicantListErr, isError: isNewApplicantListErr
    } = useQuery({
        queryKey: ['newApplicantList'],
        queryFn: async () => {
            const data = await phoneSubscriptionService.newApplicantList()
            return data
        },
        retry: 1
    })

    return { newApplicantList, newApplicantListLoading, newApplicantListErr, isNewApplicantListErr }
}

export const useNewApplicantAction = () => {
    const queryClient = useQueryClient()
    const {
        mutateAsync: newApplicantAction, isError: isNewApplicantActionErr, error: newApplicantActionErr
    } = useMutation({
        mutationFn: async ({ subsId, applicantData }) => {
            const data = await phoneSubscriptionService.newApplicantAction(subsId, applicantData)
            return data
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['newApplicantList'] })
    })

    return { newApplicantAction, isNewApplicantActionErr, newApplicantActionErr }
}

export const useWaitingEstablishList = () => {
    const {
        data: waitingEstablishList, isLoading: waitingEstablishListLoading,
        error: waitingEstablishListErr, isError: isWaitingEstablishListErr
    } = useQuery({
        queryKey: ['waitingEstablishList'],
        queryFn: async () => {
            const data = await phoneSubscriptionService.waitingEstablishList()
            return data
        },
        retry: 1
    })

    return {
        waitingEstablishList, waitingEstablishListLoading,
        waitingEstablishListErr, isWaitingEstablishListErr
    }
}
