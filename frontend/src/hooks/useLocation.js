import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { locationService } from '../services/locationService'

export const useAllProvinces = () => {
    const { 
        data: allProvinces, isLoading: allProvincesLoading, 
        error: allProvincesErr, isError: isAllProvincesErr
    } = useQuery({
        queryKey: ['allProvinces'],
        queryFn: async () => {
            const data = await locationService.getProvinces()
            return data
        },
        retry: 1
    })

    return { allProvinces, allProvincesLoading, allProvincesErr, isAllProvincesErr }
}

export const useCreateProvince = () => {
    const queryClient = useQueryClient()

    const { 
        mutateAsync: createProvince, isPending: createProvincePending, 
        error: createProvinceErr, isError: isCreateProvinceErr
    } = useMutation({
        mutationFn: async ({ name }) => {
            const result = await locationService.createProvince({ name })
            return result
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['allProvinces'] })
    })

    return { createProvince, createProvincePending, createProvinceErr, isCreateProvinceErr }
}

export const useProvinceCities = (provinceId) => {
    const { 
        data: provinceCities, isLoading: provinceCitiesLoading, 
        error: provinceCitiesErr, isError: isProvinceCitiesErr
    } = useQuery({
        queryKey: ['provinceCities', provinceId],
        queryFn: async () => {
            const data = await locationService.getProvinceCities(provinceId)
            return data
        },
        retry: 1,
        enabled: !!provinceId
    })

    return { provinceCities, provinceCitiesLoading, provinceCitiesErr, isProvinceCitiesErr }
}

export const useCreateCity = () => {
    const queryClient = useQueryClient()

    const { 
        mutateAsync: createCity, isPending: createCityPending, 
        error: createCityErr, isError: isCreateCityErr
    } = useMutation({
        mutationFn: async ({ name, province_id }) => {
            const result = await locationService.createCity({ name, province_id })
            return result
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['provinceCities'] })
    })

    return { createCity, createCityPending, createCityErr, isCreateCityErr }
}

export const useCityAreas = (cityId) => {
    const { 
        data: cityAreas, isLoading: cityAreasLoading, 
        error: cityAreasErr, isError: isCityAreasErr
    } = useQuery({
        queryKey: ['cityAreas', cityId],
        queryFn: async () => {
            const data = await locationService.getCityAreas(cityId)
            return data
        },
        retry: 1,
        enabled: !!cityId
    })

    return { cityAreas, cityAreasLoading, cityAreasErr, isCityAreasErr }
}

export const useCreateArea = () => {
    const queryClient = useQueryClient()

    const { 
        mutateAsync: createArea, isPending: createAreaPending, 
        error: createAreaErr, isError: isCreateAreaErr
    } = useMutation({
        mutationFn: async ({ name, city_id }) => {
            const result = await locationService.createArea({ name, city_id })
            return result
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cityAreas'] })
    })

    return { createArea, createAreaPending, createAreaErr, isCreateAreaErr }
}
